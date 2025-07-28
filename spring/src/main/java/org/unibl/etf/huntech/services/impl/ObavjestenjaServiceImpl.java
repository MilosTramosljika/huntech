package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.ObavjestenjaEntity;
import org.unibl.etf.huntech.repositories.ObavjestenjaEntityRepository;
import org.unibl.etf.huntech.services.ObavjestenjaService;

@Service
@Transactional
public class ObavjestenjaServiceImpl extends CrudJpaService<ObavjestenjaEntity, Integer> implements ObavjestenjaService {

    public ObavjestenjaServiceImpl(ObavjestenjaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ObavjestenjaEntity.class);
    }
}
