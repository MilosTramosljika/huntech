package org.unibl.etf.huntech.services.impl;


import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.KorisnikHasUlogaEntity;
import org.unibl.etf.huntech.repositories.KorisnikHasUlogaEntityRepository;
import org.unibl.etf.huntech.services.KorisnikHasUlogaService;

@Service
@Transactional
public class KorisnikHasUlogaServiceImpl extends CrudJpaService<KorisnikHasUlogaEntity, Integer>
        implements KorisnikHasUlogaService {

    public KorisnikHasUlogaServiceImpl(KorisnikHasUlogaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper,  KorisnikHasUlogaEntity.class);
    }

}
