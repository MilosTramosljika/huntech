package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.KorisnikHasGrupaEntity;
import org.unibl.etf.huntech.repositories.KorisnikHasGrupaEntityRepository;
import org.unibl.etf.huntech.services.KorisnikHasGrupaService;


@Service
@Transactional
public class KorisnikHasGrupaServiceImpl extends CrudJpaService<KorisnikHasGrupaEntity, Integer>
implements KorisnikHasGrupaService {

    public KorisnikHasGrupaServiceImpl(KorisnikHasGrupaEntityRepository repository, ModelMapper modelMapper) {

        super(repository, modelMapper, KorisnikHasGrupaEntity.class);
    }
}
