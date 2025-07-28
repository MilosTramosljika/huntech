package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.entities.KorisnikHasKonverzacijaEntity;
import org.unibl.etf.huntech.repositories.KorisnikHasKonverzacijaEntityRepository;
import org.unibl.etf.huntech.services.KorisnikHasKonverzacijaService;


@Service
@Transactional
public class KorisnikHasKonverzacijaServiceImpl extends CrudJpaService<KorisnikHasKonverzacijaEntity, Integer>
implements KorisnikHasKonverzacijaService {

    public KorisnikHasKonverzacijaServiceImpl(KorisnikHasKonverzacijaEntityRepository repository,
                                              ModelMapper modelMapper) {

        super(repository, modelMapper, KorisnikHasKonverzacijaEntity.class);
    }
}
