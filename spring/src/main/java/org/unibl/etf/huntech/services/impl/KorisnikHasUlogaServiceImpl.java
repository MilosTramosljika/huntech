package org.unibl.etf.huntech.services.impl;


import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.KorisnikHasUloga;
import org.unibl.etf.huntech.models.entities.KorisnikHasUlogaEntity;
import org.unibl.etf.huntech.repositories.KorisnikHasUlogaEntityRepository;
import org.unibl.etf.huntech.services.KorisnikHasUlogaService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class KorisnikHasUlogaServiceImpl extends CrudJpaService<KorisnikHasUlogaEntity, Integer>
        implements KorisnikHasUlogaService {

    private final KorisnikHasUlogaEntityRepository repository;
    private final ModelMapper modelMapper;

    public KorisnikHasUlogaServiceImpl(KorisnikHasUlogaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper,  KorisnikHasUlogaEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<KorisnikHasUloga> getKorisnikHasUlogaByIdKorisnika(Integer korisnik_id){
        return repository.findKorisnikHasUlogaByIdKorisnika_Id(korisnik_id).stream().map(a -> modelMapper.map(a, KorisnikHasUloga.class)).collect(Collectors.toList());
    }

}
