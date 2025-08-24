package org.unibl.etf.huntech.services.impl;


import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.ObjavaNaLovackiDnevnik;
import org.unibl.etf.huntech.models.entities.ObjavaNaLovackiDnevnikEntity;
import org.unibl.etf.huntech.repositories.ObjavaNaLovackiDnevnikEntityRepository;
import org.unibl.etf.huntech.services.ObjavaNaLovackiDnevnikService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ObjavaNaLovackiDnevnikServiceImpl
        extends CrudJpaService<ObjavaNaLovackiDnevnikEntity, Integer> implements ObjavaNaLovackiDnevnikService {

        private final ObjavaNaLovackiDnevnikEntityRepository repository;
    private final ModelMapper modelMapper;

    public ObjavaNaLovackiDnevnikServiceImpl(ObjavaNaLovackiDnevnikEntityRepository repository, ModelMapper modelMapper) {
            super(repository, modelMapper, ObjavaNaLovackiDnevnikEntity.class);
            this.repository = repository;
            this.modelMapper = modelMapper;
    }

        @Override
        public List<ObjavaNaLovackiDnevnik> getObjaveNaLovackomDnevnikuByKorisnikId(Integer korisnikId){
            return repository.findByIdKorisnika_Id(korisnikId).stream().map(a -> modelMapper.map(a, ObjavaNaLovackiDnevnik.class)).collect(Collectors.toList());
        }
}
