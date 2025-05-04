/*
package com.stream.app.services;

import com.stream.app.entities.Video;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

public interface VideoService {

    //save the video
    Video save(Video video, MultipartFile file);

    //get video by id
    Video get(String videoId);

    //get video by title
    Video getByTitle(String title);

    //get all videos
    List<Video> getAll();

    //video processing
    String processVideo(String videoId);
}
*/

package com.stream.app.services;

import com.stream.app.entities.Video;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

public interface VideoService {

    //save the video
    Video save(Video video, MultipartFile file);

    //get video by id
    Video get(String videoId);

    //get video by title
    Video getByTitle(String title);

    //get all videos
    List<Video> getAll();

    //get all videos or audio based on type
    List<Video> getAllByType(String fileType);

    //search videos by title
    List<Video> searchByTitle(String title, String fileType);

    //video processing
    String processVideo(String videoId);
}