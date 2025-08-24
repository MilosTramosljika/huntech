package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.LokacijaEntity;
import org.unibl.etf.huntech.repositories.LokacijaEntityRepository;
import org.unibl.etf.huntech.services.LokacijaService;

@Service
@Transactional
public class LokacijaServiceImpl extends CrudJpaService<LokacijaEntity, Integer> implements LokacijaService {

    public LokacijaServiceImpl(LokacijaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, LokacijaEntity.class);
    }
}
