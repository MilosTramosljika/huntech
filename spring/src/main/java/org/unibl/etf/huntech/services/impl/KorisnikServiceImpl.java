package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.exceptions.ConflictException;
import org.unibl.etf.huntech.exceptions.NotFoundException;
import org.unibl.etf.huntech.models.Korisnik;
import org.unibl.etf.huntech.models.SingleKorisnik;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.repositories.KorisnikEntityRepository;
import org.unibl.etf.huntech.services.KorisnikService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


@Service
@Transactional
public class KorisnikServiceImpl extends CrudJpaService<KorisnikEntity, Integer> implements KorisnikService {

    private final KorisnikEntityRepository repository;
    private final ModelMapper modelMapper;

    public KorisnikServiceImpl(KorisnikEntityRepository repository, ModelMapper modelMapper, ModelMapper modelMapper1) {
        super(repository, modelMapper, KorisnikEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper1;
    }
    /*
    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass) {

        if (repository.existsByIme(getModelMapper().map(object, getEntityClass()).getIme()))
            throw new ConflictException();

        return super.insert(object, resultDtoClass);
    }
    */

    @Override
    public <T, U> T update(Integer integer, U object, Class<T> resultDtoClass) {
        if (repository.existsByImeAndIdNot(getModelMapper().map(object, getEntityClass()).getIme(), integer))
            throw new ConflictException();

        return super.update(integer, object, resultDtoClass);
    }


    @Override
    public String uploadProfilnaSlika(Integer korisnikId, MultipartFile slika) throws IOException {
        KorisnikEntity korisnik = repository.findById(korisnikId)
                .orElseThrow(() -> new RuntimeException("Korisnik nije pronađen"));

        String folderPath = "uploads/profilne";
        Files.createDirectories(Paths.get(folderPath));

        String originalFileName = slika.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        String nazivFajla = "korisnik_" + korisnikId + fileExtension;

        Path putanja = Paths.get(folderPath, nazivFajla);
        Files.write(putanja, slika.getBytes());

        // Relativna putanja koju čuvaš u bazi
        String relativnaPutanja = "/uploads/profilne/" + nazivFajla;
        korisnik.setSlika(relativnaPutanja);

        repository.save(korisnik);

        return nazivFajla;
    }


    @Override
    public Resource getProfilnaSlikaResource(String fileName) throws MalformedURLException {
        Path basePath = Paths.get("uploads/profilne").toAbsolutePath().normalize();
        Path filePath = basePath.resolve(fileName).normalize();

        if (!filePath.startsWith(basePath)) {
            throw new RuntimeException("Neovlašteni pristup fajlu");
        }
        if (!filePath.startsWith(Paths.get("uploads/profilne").toAbsolutePath())) {
            throw new RuntimeException("Neovlašteni pristup fajlu");
        }
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("Fajl nije pronađen ili nije čitljiv");
        }
        return resource;
    }



    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass) {
        Korisnik dto = modelMapper.map(object, Korisnik.class);
        KorisnikEntity entity = new KorisnikEntity();

        entity.setIme(dto.getIme());
        entity.setPrezime(dto.getPrezime());
        entity.setUsername(dto.getUsername());
        entity.setMail(dto.getMail());
        entity.setLozinka(dto.getLozinka());
        entity.setSlika(dto.getSlika());
        entity.setId(null); // auto-generisani ID
        entity = repository.saveAndFlush(entity);
        return modelMapper.map(entity, resultDtoClass);
    }

    @Override
    public SingleKorisnik findKorisnikById(Integer id) throws NotFoundException {
        return  modelMapper.map(repository.findById(id).orElseThrow(NotFoundException::new), SingleKorisnik.class);
    }

}
