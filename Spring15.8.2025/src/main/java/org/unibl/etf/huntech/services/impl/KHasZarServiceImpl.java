package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.KHasZarEntity;
import org.unibl.etf.huntech.repositories.KHasZarEntityRepository;
import org.unibl.etf.huntech.services.KHasZarService;

@Service
@Transactional
public class KHasZarServiceImpl extends CrudJpaService<KHasZarEntity, Integer> implements KHasZarService {


    public KHasZarServiceImpl(KHasZarEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, KHasZarEntity.class);
    }
}
