package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.AktivnostDivljaciEntity;
import org.unibl.etf.huntech.repositories.AktivnostDivljaciEntityRepository;
import org.unibl.etf.huntech.services.AktivnostDivljaciService;

@Service
@Transactional
public class AktivnostDivljaciServiceImpl extends CrudJpaService<AktivnostDivljaciEntity, Integer>
        implements AktivnostDivljaciService {

    public AktivnostDivljaciServiceImpl(AktivnostDivljaciEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, AktivnostDivljaciEntity.class);
    }

}
