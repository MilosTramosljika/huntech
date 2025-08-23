package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.ObjavaNaLovackiDnevnik;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.repositories.DogadjajEntityRepository;
import org.unibl.etf.huntech.services.DogadjajService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DogadjajServiceImpl extends CrudJpaService<DogadjajEntity, Integer> implements DogadjajService {
    private final DogadjajEntityRepository dogadjajRepository;
    private final ModelMapper modelMapper;

    public DogadjajServiceImpl(DogadjajEntityRepository dogadjajRepository, ModelMapper modelMapper) {
        super(dogadjajRepository, modelMapper, DogadjajEntity.class);
        this.dogadjajRepository = dogadjajRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<Dogadjaj> getDogadjajiByObjavaId(Integer objavaId) {
        return dogadjajRepository.findByIdObjaveNaLD_Id(objavaId).stream().map(a -> modelMapper.map(a, Dogadjaj.class)).collect(Collectors.toList());
    }
}
