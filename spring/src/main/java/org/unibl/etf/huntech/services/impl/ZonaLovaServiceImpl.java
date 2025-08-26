package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.ZonaLova;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.entities.ZonaLovaEntity;
import org.unibl.etf.huntech.repositories.DogadjajEntityRepository;
import org.unibl.etf.huntech.repositories.ZonaLovaEntityRepository;
import org.unibl.etf.huntech.services.DogadjajService;
import org.unibl.etf.huntech.services.ZonaLovaService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ZonaLovaServiceImpl extends CrudJpaService<ZonaLovaEntity, Integer> implements ZonaLovaService {
    private final ZonaLovaEntityRepository zonaLovaRepository;
    private final ModelMapper modelMapper;

    public ZonaLovaServiceImpl(ZonaLovaEntityRepository zonaLovaRepository, ModelMapper modelMapper) {
        super(zonaLovaRepository, modelMapper, ZonaLovaEntity.class);
        this.zonaLovaRepository = zonaLovaRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ZonaLova> getZonaLovaByIdGrupe(Integer idGrupe) {
        return zonaLovaRepository.findByIdGrupe_Id(idGrupe).stream().map(a -> modelMapper.map(a, ZonaLova.class)).collect(Collectors.toList());
    }
}
