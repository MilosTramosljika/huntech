package org.unibl.etf.huntech.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.exceptions.NotFoundException;
import org.unibl.etf.huntech.models.Poruka;
import org.unibl.etf.huntech.models.entities.PorukaEntity;
import org.unibl.etf.huntech.znzm.SinglePoruka;
import org.unibl.etf.huntech.repositories.PorukaEntityRepository;
import org.unibl.etf.huntech.services.PorukaService;

import java.util.List;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional; //jakarta ili javax kao sto je u videu

@Service
@Transactional
public class PorukaServiceImpl extends CrudJpaService<PorukaEntity, Integer>  implements PorukaService {

    //private final ModelMapper modelMapper;
    //private final PorukaEntityRepository repository;

    public PorukaServiceImpl(PorukaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, PorukaEntity.class);
    }

}
