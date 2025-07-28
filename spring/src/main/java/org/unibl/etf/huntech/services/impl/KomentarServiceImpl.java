package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.KomentarEntity;
import org.unibl.etf.huntech.repositories.KomentarEntityRepository;
import org.unibl.etf.huntech.services.KomentarService;


@Service
@Transactional
public class KomentarServiceImpl extends CrudJpaService<KomentarEntity, Integer> implements KomentarService {

    public KomentarServiceImpl(KomentarEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, KomentarEntity.class);
    }
}
