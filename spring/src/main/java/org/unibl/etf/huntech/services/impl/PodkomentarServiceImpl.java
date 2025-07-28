package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Podkomentar;
import org.unibl.etf.huntech.models.entities.PodkomentarEntity;
import org.unibl.etf.huntech.repositories.PodkomentarEntityRepository;
import org.unibl.etf.huntech.services.PodkomentarService;


@Service
@Transactional
public class PodkomentarServiceImpl extends CrudJpaService<PodkomentarEntity, Integer> implements PodkomentarService {

    public PodkomentarServiceImpl(PodkomentarEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, PodkomentarEntity.class);
    }

}
