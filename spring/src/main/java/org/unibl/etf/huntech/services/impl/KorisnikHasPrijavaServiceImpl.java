package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.KorisnikHasPrijavaEntity;
import org.unibl.etf.huntech.models.entities.KorisnikHasUlogaEntity;
import org.unibl.etf.huntech.repositories.KorisnikHasPrijavaEntityRepository;
import org.unibl.etf.huntech.services.KorisnikHasPrijavaService;


@Service
@Transactional
public class KorisnikHasPrijavaServiceImpl extends CrudJpaService<KorisnikHasPrijavaEntity, Integer>
implements KorisnikHasPrijavaService {

    public KorisnikHasPrijavaServiceImpl(KorisnikHasPrijavaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, KorisnikHasPrijavaEntity.class);
    }

}
