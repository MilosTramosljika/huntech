package org.unibl.etf.huntech.services.impl;


import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;


import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Poruka;
import org.unibl.etf.huntech.models.Prijava;
import org.unibl.etf.huntech.models.entities.PrijavaEntity;
import org.unibl.etf.huntech.repositories.PrijavaEntityRepository;
import org.unibl.etf.huntech.services.PrijavaService;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PrijavaServiceImpl extends CrudJpaService<PrijavaEntity, Integer> implements PrijavaService {

     //private final ModelMapper modelMapper;
     //private final PrijavaEntityRepository repository;

    public PrijavaServiceImpl(ModelMapper modelMapper, PrijavaEntityRepository repository) {
        super(repository, modelMapper, PrijavaEntity.class);
        //this.modelMapper = modelMapper;
        //this.repository = repository;
    }
}
