package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.KonverzacijaEntity;
import org.unibl.etf.huntech.repositories.KonverzacijaEntityRepository;
import org.unibl.etf.huntech.services.KonverzacijaService;


@Service
@Transactional
public class KonverzacijaServiceImpl extends CrudJpaService<KonverzacijaEntity, Integer>
implements KonverzacijaService {

    public KonverzacijaServiceImpl(KonverzacijaEntityRepository repository, ModelMapper modelMapper) {

        super(repository, modelMapper, KonverzacijaEntity.class);
    }
}
