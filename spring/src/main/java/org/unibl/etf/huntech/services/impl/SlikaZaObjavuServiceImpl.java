package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Komentar;
import org.unibl.etf.huntech.models.SlikaZaObjavu;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuEntity;
import org.unibl.etf.huntech.repositories.SlikaZaObjavuEntityRepository;
import org.unibl.etf.huntech.services.SlikaZaObjavuService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SlikaZaObjavuServiceImpl extends CrudJpaService<SlikaZaObjavuEntity, Integer> implements SlikaZaObjavuService {

    private final SlikaZaObjavuEntityRepository repository;
    private final ModelMapper modelMapper;

    public SlikaZaObjavuServiceImpl(SlikaZaObjavuEntityRepository repository, ModelMapper modelMapper){
        super(repository, modelMapper, SlikaZaObjavuEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<SlikaZaObjavu> getSlikaZaObjavuByObjavaId(Integer objavaId) {
        return repository.findSlikaZaObjavuByIdObjave_Id(objavaId).stream().map(a -> modelMapper.
                map(a, SlikaZaObjavu.class)).collect(Collectors.toList());
    }
}