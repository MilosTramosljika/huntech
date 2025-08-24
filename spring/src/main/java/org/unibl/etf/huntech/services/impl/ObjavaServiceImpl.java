package org.unibl.etf.huntech.services.impl;


import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.Objava;
import org.unibl.etf.huntech.models.entities.ObjavaEntity;
import org.unibl.etf.huntech.repositories.ObjavaEntityRepository;
import org.unibl.etf.huntech.repositories.PodkomentarEntityRepository;
import org.unibl.etf.huntech.services.ObjavaService;
import org.unibl.etf.huntech.services.PodkomentarService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ObjavaServiceImpl extends CrudJpaService<ObjavaEntity, Integer> implements ObjavaService {

    private final ObjavaEntityRepository repository;
    private final ModelMapper modelMapper;

    public ObjavaServiceImpl(ObjavaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ObjavaEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<Objava> getObjaveByGrupaId(Integer grupaId){
        return repository.findObjavaByIdGrupe_Id(grupaId).stream().map(a -> modelMapper.map(a, Objava.class)).collect(Collectors.toList());
    }
}
