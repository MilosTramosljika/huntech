package org.unibl.etf.huntech.services.impl;


import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.ZahtjevZaPromjenuStatusaEntity;
import org.unibl.etf.huntech.repositories.ZahtjevZaPromjenuStatusaEntityRepository;
import org.unibl.etf.huntech.services.ZahtjevZaPromjenuStatusaService;

@Service
@Transactional
public class ZahtjevZaPromjenuStatusaServiceImpl extends CrudJpaService<ZahtjevZaPromjenuStatusaEntity,
        Integer> implements ZahtjevZaPromjenuStatusaService {


    public ZahtjevZaPromjenuStatusaServiceImpl(ZahtjevZaPromjenuStatusaEntityRepository repository,
                                               ModelMapper modelMapper) {
        super(repository, modelMapper, ZahtjevZaPromjenuStatusaEntity.class);
    }

}
