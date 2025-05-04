/*
package com.stream.app.repositories;

//Repository is used to communicate to the database

import com.stream.app.entities.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video,String> {

    Optional<Video>findByTitle(String title);

    //query methods

    //native
}
*/


//Repository is used to communicate to the database

package com.stream.app.repositories;

import com.stream.app.entities.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video,String> {

    Optional<Video> findByTitle(String title);

    // Query method to find all video files
    List<Video> findByFileType(String fileType);

    // Query method to search videos by title containing specific text
    List<Video> findByTitleContainingIgnoreCaseAndFileType(String title, String fileType);

    //query methods

    //native
}