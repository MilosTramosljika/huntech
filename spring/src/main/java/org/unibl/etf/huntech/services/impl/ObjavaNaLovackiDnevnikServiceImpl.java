package org.unibl.etf.huntech.services.impl;


import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.ObjavaNaLovackiDnevnikEntity;
import org.unibl.etf.huntech.repositories.ObjavaNaLovackiDnevnikEntityRepository;
import org.unibl.etf.huntech.services.ObjavaNaLovackiDnevnikService;

@Service
@Transactional
public class ObjavaNaLovackiDnevnikServiceImpl
        extends CrudJpaService<ObjavaNaLovackiDnevnikEntity, Integer> implements ObjavaNaLovackiDnevnikService {

        public ObjavaNaLovackiDnevnikServiceImpl(ObjavaNaLovackiDnevnikEntityRepository repository,
                                                 ModelMapper modelMapper) {
            super(repository, modelMapper, ObjavaNaLovackiDnevnikEntity.class);
        }
}
