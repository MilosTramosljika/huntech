package org.unibl.etf.huntech.services.impl;


import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.ObjavaEntity;
import org.unibl.etf.huntech.repositories.ObjavaEntityRepository;
import org.unibl.etf.huntech.repositories.PodkomentarEntityRepository;
import org.unibl.etf.huntech.services.ObjavaService;
import org.unibl.etf.huntech.services.PodkomentarService;

@Service
@Transactional
public class ObjavaServiceImpl extends CrudJpaService<ObjavaEntity, Integer> implements ObjavaService {

    public ObjavaServiceImpl(ObjavaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ObjavaEntity.class);
    }
}
