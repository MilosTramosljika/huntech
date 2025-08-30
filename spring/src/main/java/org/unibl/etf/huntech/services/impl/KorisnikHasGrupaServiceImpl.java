package org.unibl.etf.huntech.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.models.KorisnikHasGrupa;
import org.unibl.etf.huntech.models.entities.KorisnikHasGrupaEntity;
import org.unibl.etf.huntech.repositories.KorisnikHasGrupaEntityRepository;
import org.unibl.etf.huntech.services.KorisnikHasGrupaService;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class KorisnikHasGrupaServiceImpl extends CrudJpaService<KorisnikHasGrupaEntity, Integer>
implements KorisnikHasGrupaService {

    private final KorisnikHasGrupaEntityRepository repository;
    private final ModelMapper modelMapper;

    public KorisnikHasGrupaServiceImpl(KorisnikHasGrupaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, KorisnikHasGrupaEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<KorisnikHasGrupa> getKorisnikHasGrupaByIdKorisnika(Integer korisnik_id){
        return repository.findKorisnikHasGrupaByIdKorisnika_Id(korisnik_id).stream().map(a -> modelMapper.map(a, KorisnikHasGrupa.class)).collect(Collectors.toList());
    }
}
