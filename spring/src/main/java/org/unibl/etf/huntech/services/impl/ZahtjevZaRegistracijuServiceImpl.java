package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.entities.ZahtjevZaRegistracijuEntity;
import org.unibl.etf.huntech.repositories.ZahtjevZaRegistracijuEntityRepository;
import org.unibl.etf.huntech.services.ZahtjevZaRegistracijuService;

@Service
@Transactional
public class ZahtjevZaRegistracijuServiceImpl extends CrudJpaService<ZahtjevZaRegistracijuEntity, Integer>
implements ZahtjevZaRegistracijuService {

    public ZahtjevZaRegistracijuServiceImpl(ZahtjevZaRegistracijuEntityRepository repository, ModelMapper modelMapper){
        super(repository, modelMapper, ZahtjevZaRegistracijuEntity.class);
    }

}
