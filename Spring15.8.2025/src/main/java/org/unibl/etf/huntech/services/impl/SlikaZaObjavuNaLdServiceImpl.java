package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuNaLdEntity;
import org.unibl.etf.huntech.repositories.SlikaZaObjavuNaLdEntityRepository;
import org.unibl.etf.huntech.services.SlikaZaObjavuNaLdService;


@Service
@Transactional
public class SlikaZaObjavuNaLdServiceImpl extends CrudJpaService<SlikaZaObjavuNaLdEntity, Integer > implements SlikaZaObjavuNaLdService {
    public SlikaZaObjavuNaLdServiceImpl(SlikaZaObjavuNaLdEntityRepository repository, ModelMapper modelMapper){
        super(repository, modelMapper, SlikaZaObjavuNaLdEntity.class);

    }
}
