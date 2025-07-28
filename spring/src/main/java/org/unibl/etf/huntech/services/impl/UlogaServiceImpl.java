package org.unibl.etf.huntech.services.impl;

import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.UlogaEntity;
import org.unibl.etf.huntech.repositories.UlogaEntityRepository;
import org.unibl.etf.huntech.services.UlogaService;


@Service
@Transactional
public class UlogaServiceImpl extends CrudJpaService<UlogaEntity, Integer> implements UlogaService {

    public UlogaServiceImpl(UlogaEntityRepository repository,  ModelMapper modelMapper) {
        super(repository, modelMapper, UlogaEntity.class);
    }
}
