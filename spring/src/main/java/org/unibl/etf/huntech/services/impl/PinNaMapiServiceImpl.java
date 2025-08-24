package org.unibl.etf.huntech.services.impl;


import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.PinNaMapi;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.entities.PinNaMapiEntity;
import org.unibl.etf.huntech.repositories.DogadjajEntityRepository;
import org.unibl.etf.huntech.repositories.PinNaMapiEntityRepository;
import org.unibl.etf.huntech.services.DogadjajService;
import org.unibl.etf.huntech.services.PinNaMapiService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PinNaMapiServiceImpl extends CrudJpaService<PinNaMapiEntity, Integer> implements PinNaMapiService {
    private final PinNaMapiEntityRepository repository;
    private final ModelMapper modelMapper;

    public PinNaMapiServiceImpl(PinNaMapiEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, PinNaMapiEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<PinNaMapi> getPinNaMapiByGrupaId(Integer objavaId) {
        return repository.findPinNaMapiByIdGrupe_Id(objavaId).stream().map(a -> modelMapper.map(a, PinNaMapi.class)).collect(Collectors.toList());
    }
}
