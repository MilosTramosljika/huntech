package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.GrupaEntity;
import org.unibl.etf.huntech.repositories.GrupaEntityRepository;
import org.unibl.etf.huntech.repositories.KHasZarEntityRepository;
import org.unibl.etf.huntech.services.GrupaService;
import org.unibl.etf.huntech.services.KHasZarService;


@Service
@Transactional
public class GrupaServiceImpl extends CrudJpaService<GrupaEntity, Integer> implements GrupaService {

    public GrupaServiceImpl(GrupaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, GrupaEntity.class);
    }
}
