package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.SlikaZaObjavu;
import org.unibl.etf.huntech.models.SlikaZaObjavuNaLd;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuNaLdEntity;
import org.unibl.etf.huntech.repositories.SlikaZaObjavuNaLdEntityRepository;
import org.unibl.etf.huntech.services.SlikaZaObjavuNaLdService;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class SlikaZaObjavuNaLdServiceImpl extends CrudJpaService<SlikaZaObjavuNaLdEntity, Integer > implements SlikaZaObjavuNaLdService {
    private final SlikaZaObjavuNaLdEntityRepository repository;
    private final ModelMapper modelMapper;


    public SlikaZaObjavuNaLdServiceImpl(SlikaZaObjavuNaLdEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, SlikaZaObjavuNaLdEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<SlikaZaObjavuNaLd> getSlikeZaObjavuNaLdByObjavaId(Integer objavaId) {
        return repository.findByIdObjaveNaLD_Id(objavaId).stream().map(a -> modelMapper.map(a, SlikaZaObjavuNaLd.class)).collect(Collectors.toList());
    }

}
