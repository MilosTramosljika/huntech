package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.exceptions.ConflictException;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.repositories.KorisnikEntityRepository;
import org.unibl.etf.huntech.services.KorisnikService;


@Service
@Transactional
public class KorisnikServiceImpl extends CrudJpaService<KorisnikEntity, Integer> implements KorisnikService {

    private KorisnikEntityRepository repository;

    public KorisnikServiceImpl(KorisnikEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, KorisnikEntity.class);
    }

    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass){

        if(repository.existsByIme(getModelMapper().map(object, getEntityClass()).getIme()))
            throw new ConflictException();

        return super.insert(object, resultDtoClass);
    }

    @Override
    public <T, U> T update(Integer integer, U object, Class<T> resultDtoClass){
        if(repository.existsByImeAndIdNot(getModelMapper().map(object, getEntityClass()).getIme(), integer))
            throw new ConflictException();

        return super.update(integer, object, resultDtoClass);
    }
}
