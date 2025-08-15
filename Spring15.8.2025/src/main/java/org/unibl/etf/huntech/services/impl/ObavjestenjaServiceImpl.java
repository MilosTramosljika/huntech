package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Obavjestenja;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.ObavjestenjaEntity;
import org.unibl.etf.huntech.models.enums.TipObavjestenja;
import org.unibl.etf.huntech.repositories.KorisnikEntityRepository;
import org.unibl.etf.huntech.repositories.ObavjestenjaEntityRepository;
import org.unibl.etf.huntech.services.ObavjestenjaService;

@Service
@Transactional
public class ObavjestenjaServiceImpl extends CrudJpaService<ObavjestenjaEntity, Integer> implements ObavjestenjaService {

    private final ObavjestenjaEntityRepository repository;

    private final KorisnikEntityRepository korisnikRepository;
    private final ModelMapper modelMapper;

    public ObavjestenjaServiceImpl(ObavjestenjaEntityRepository repository, ModelMapper modelMapper, KorisnikEntityRepository korisnikRepository, ModelMapper modelMapper1) {
        super(repository, modelMapper, ObavjestenjaEntity.class);
        this.repository = repository;
        this.korisnikRepository = korisnikRepository;
        this.modelMapper = modelMapper1;
    }


    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass) {
        Obavjestenja dto = modelMapper.map(object, Obavjestenja.class);
        ObavjestenjaEntity entity = new ObavjestenjaEntity();

        entity.setTipObavjestenja(TipObavjestenja.valueOf(dto.getTipObavjestenja()));
        entity.setSadrzaj(dto.getSadrzaj());

        // učitaj korisnika po idKorisnika
        KorisnikEntity korisnik = korisnikRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Korisnik nije pronađen"));

        entity.setIdKorisnika(korisnik);
        entity.setId(null); // da se generiše ID
        entity = repository.saveAndFlush(entity);

        return modelMapper.map(entity, resultDtoClass);
    }


}

