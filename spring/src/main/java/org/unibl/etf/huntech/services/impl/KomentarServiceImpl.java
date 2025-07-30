package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Komentar;
import org.unibl.etf.huntech.models.entities.KomentarEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.ObjavaEntity;
import org.unibl.etf.huntech.models.requests.KomentarRequest;
import org.unibl.etf.huntech.repositories.KomentarEntityRepository;
import org.unibl.etf.huntech.repositories.KorisnikEntityRepository;
import org.unibl.etf.huntech.repositories.ObjavaEntityRepository;
import org.unibl.etf.huntech.services.KomentarService;


@Service
@Transactional
public class KomentarServiceImpl extends CrudJpaService<KomentarEntity, Integer> implements KomentarService {


//    private final ObjavaEntityRepository objavaRepository;
//
//    private final KorisnikEntityRepository korisnikRepository;
//
//    private final KomentarEntityRepository repository;

    public KomentarServiceImpl(KomentarEntityRepository repository, ModelMapper modelMapper, ObjavaEntityRepository objavaRepository, KorisnikEntityRepository korisnikRepository, KomentarEntityRepository repository1) {
        super(repository, modelMapper, KomentarEntity.class);
//        this.objavaRepository = objavaRepository;
//        this.korisnikRepository = korisnikRepository;
//        this.repository = repository1;
    }

//    public KomentarEntity insert(KomentarRequest request) {
//        KomentarEntity komentar = new KomentarEntity();
//        komentar.setSadrzaj(request.getSadrzaj());
//
//        KorisnikEntity korisnik = korisnikRepository.findById(request.getIdKorisnika())
//                .orElseThrow(() -> new RuntimeException("Korisnik ne postoji."));
//        ObjavaEntity objava = objavaRepository.findById(request.getIdObjave())
//                .orElseThrow(() -> new RuntimeException("Objava ne postoji."));
//
//        komentar.setIdKorisnika(korisnik);
//        komentar.setIdObjave(objava);
//
//        return repository.save(komentar);
//    }

}
