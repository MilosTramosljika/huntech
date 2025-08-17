package org.unibl.etf.huntech.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.exceptions.NotFoundException;
import org.unibl.etf.huntech.models.SingleKorisnik;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

import java.io.IOException;
import java.net.MalformedURLException;

public interface KorisnikService extends CrudService<Integer> {


    String uploadProfilnaSlika(Integer korisnikId, MultipartFile file) throws IOException;
    Resource getProfilnaSlikaResource(String fileName) throws MalformedURLException;
    SingleKorisnik findKorisnikById(Integer id);

    SingleKorisnik findKorisnikByUsername(String username) throws NotFoundException;
    SingleKorisnik findKorisnikByMail(String email) throws NotFoundException;
}
