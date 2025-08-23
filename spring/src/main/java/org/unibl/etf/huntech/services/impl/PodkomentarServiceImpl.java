package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.Podkomentar;
import org.unibl.etf.huntech.models.entities.PodkomentarEntity;
import org.unibl.etf.huntech.repositories.PodkomentarEntityRepository;
import org.unibl.etf.huntech.services.PodkomentarService;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class PodkomentarServiceImpl extends CrudJpaService<PodkomentarEntity, Integer> implements PodkomentarService {

    private final PodkomentarEntityRepository repository;
    private final ModelMapper modelMapper;

    public PodkomentarServiceImpl(PodkomentarEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, PodkomentarEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<Podkomentar> getPodkomentarByKomentarId(Integer komentarId) {
        return repository.findPodkomentarByIdKomentara_Id(komentarId).stream().
                map(a -> modelMapper.map(a, Podkomentar.class)).collect(Collectors.toList());
    }

}