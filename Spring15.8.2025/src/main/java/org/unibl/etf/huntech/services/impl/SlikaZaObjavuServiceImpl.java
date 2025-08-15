package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuEntity;
import org.unibl.etf.huntech.repositories.SlikaZaObjavuEntityRepository;
import org.unibl.etf.huntech.services.SlikaZaObjavuService;

@Service
@Transactional
public class SlikaZaObjavuServiceImpl extends CrudJpaService<SlikaZaObjavuEntity, Integer> implements SlikaZaObjavuService {

    public SlikaZaObjavuServiceImpl(SlikaZaObjavuEntityRepository repository, ModelMapper modelMapper){
        super(repository, modelMapper, SlikaZaObjavuEntity.class);
    }
}
