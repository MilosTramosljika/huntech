package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.KHasZzpEntity;
import org.unibl.etf.huntech.repositories.KHasZzpEntityRepository;
import org.unibl.etf.huntech.services.KHasZzpService;


@Service
@Transactional
public class KHasZzpServiceImpl extends CrudJpaService<KHasZzpEntity, Integer> implements KHasZzpService {

    public KHasZzpServiceImpl(KHasZzpEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, KHasZzpEntity.class);
    }

}
