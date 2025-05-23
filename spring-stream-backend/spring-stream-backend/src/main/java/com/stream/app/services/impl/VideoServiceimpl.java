/*
package com.stream.app.services.impl;

import com.stream.app.entities.Video;
import com.stream.app.repositories.VideoRepository;
import com.stream.app.services.VideoService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class VideoServiceimpl implements VideoService {

    @Value("${files.video}")
    String DIR;

    @Value("${file.video.hsl}")
    String HSL_DIR;

    private VideoRepository videoRepository;

    public VideoServiceimpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @PostConstruct
    public void init(){

        File file=new File(DIR);

        try {
            Files.createDirectories(Paths.get(HSL_DIR));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if(!file.exists()){
            file.mkdir();
            System.out.println("Folder Created");
        }else{
            System.out.println("Folder already created");
        }
    }

    @Override
    public Video save(Video video, MultipartFile file) {

        //returns the actual original filename
        try {
            String filename = file.getOriginalFilename();
            String contentType = file.getContentType();
            InputStream inputStream = file.getInputStream();


            //file path
            String cleanFileName=StringUtils.cleanPath(filename);

            //folder path:create
            String cleanFolder=StringUtils.cleanPath(DIR);

            //folder path with filename
//            Path path=Paths.get(cleanFolder,cleanFileName);

            Path path = Paths.get(DIR).normalize().toAbsolutePath().resolve(cleanFileName);
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
            video.setFilePath(path.toString()); // This stores absolute path

            System.out.println(contentType);
            System.out.println(path);

            //copy file to the folder
//            Files.copy(inputStream,path, StandardCopyOption.REPLACE_EXISTING);

            //video meta data
            video.setContentType(contentType);
//            video.setFilePath(path.toString());

            Video savedVideo=videoRepository.save(video);

            //processing video
            processVideo(savedVideo.getVideoId());

            //delete actual video file and database entry if exception occurs

            //metadata save
            return savedVideo;

        }catch(IOException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Video get(String videoId) {

        Video video=videoRepository.findById(videoId).orElseThrow(()-> new RuntimeException("Video not found"));
        return video;
    }

    @Override
    public Video getByTitle(String title) {
        return null;
    }

    @Override
    public List<Video> getAll() {

        return videoRepository.findAll();
    }

    @Override
    public String processVideo(String videoId) {

        Video video=this.get(videoId);
        String filePath=video.getFilePath();

        //path where to store data:
//        Path videoPath=Paths.get(filePath);

//        String output360p=HSL_DIR+videoId+"/360p/";
//        String output720p=HSL_DIR+videoId+"/720p/";
//        String output1080p=HSL_DIR+videoId+"/1080p/";

        try {
//            Files.createDirectories(Paths.get(output360p));
//            Files.createDirectories(Paths.get(output720p));
//            Files.createDirectories(Paths.get(output1080p));

            //ffmpeg command

//            Path outputPath=Paths.get(HSL_DIR,videoId);

            Path videoPath = Paths.get(video.getFilePath()).normalize().toAbsolutePath();
            Path outputPath = Paths.get(HSL_DIR).normalize().toAbsolutePath().resolve(videoId);

            Files.createDirectories(outputPath);

            String ffmpegCmd = String.format(
                    "ffmpeg -i \"%s\" -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename \"%s/segment_%%3d.ts\"  \"%s/master.m3u8\" ",
                    videoPath, outputPath,outputPath
            );

//            StringBuilder ffmpegCmd = new StringBuilder();
//            ffmpegCmd.append("ffmpeg  -i ")
//                    .append(videoPath.toString())
//                    .append(" -c:v libx264 -c:a aac")
//                    .append(" ")
//                    .append("-map 0:v -map 0:a -s:v:0 640x360 -b:v:0 800k ")
//                    .append("-map 0:v -map 0:a -s:v:1 1280x720 -b:v:1 2800k ")
//                    .append("-map 0:v -map 0:a -s:v:2 1920x1080 -b:v:2 5000k ")
//                    .append("-var_stream_map \"v:0,a:0 v:1,a:0 v:2,a:0\" ")
//                    .append("-master_pl_name ").append(HSL_DIR).append(videoId).append("/master.m3u8 ")
//                    .append("-f hls -hls_time 10 -hls_list_size 0 ")
//                    .append("-hls_segment_filename \"").append(HSL_DIR).append(videoId).append("/v%v/fileSequence%d.ts\" ")
//                    .append("\"").append(HSL_DIR).append(videoId).append("/v%v/prog_index.m3u8\"");

            System.out.println(ffmpegCmd);
            //file this command
            ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", ffmpegCmd);
            processBuilder.inheritIO();
            Process process = processBuilder.start();
            int exit = process.waitFor();
            if (exit != 0) {
                throw new RuntimeException("video processing failed!!");
            }

            return videoId;

        } catch (IOException e) {
            throw new RuntimeException("Video Processing Failed");
        }catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }
}
*/

package com.stream.app.services.impl;

import com.stream.app.entities.Video;
import com.stream.app.repositories.VideoRepository;
import com.stream.app.services.VideoService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class VideoServiceimpl implements VideoService {

    @Value("${files.video}")
    String DIR;

    @Value("${file.video.hsl}")
    String HSL_DIR;

    private VideoRepository videoRepository;

    public VideoServiceimpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @PostConstruct
    public void init(){
        File file = new File(DIR);

        try {
            Files.createDirectories(Paths.get(HSL_DIR));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if(!file.exists()){
            file.mkdir();
            System.out.println("Folder Created");
        }else{
            System.out.println("Folder already created");
        }
    }

    @Override
    public Video save(Video video, MultipartFile file) {
        try {
            String filename = file.getOriginalFilename();
            String contentType = file.getContentType();
            InputStream inputStream = file.getInputStream();

            // Determine file type based on content type
            if (contentType != null) {
                if (contentType.startsWith("video/")) {
                    video.setFileType("video");
                } else if (contentType.startsWith("audio/")) {
                    video.setFileType("audio");
                } else {
                    video.setFileType("other");
                }
            }

            String cleanFileName = StringUtils.cleanPath(filename);
            String cleanFolder = StringUtils.cleanPath(DIR);

            Path path = Paths.get(DIR).normalize().toAbsolutePath().resolve(cleanFileName);
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
            video.setFilePath(path.toString());

            System.out.println(contentType);
            System.out.println(path);

            video.setContentType(contentType);

            Video savedVideo = videoRepository.save(video);

            // Only process if it's a video file
            if ("video".equals(video.getFileType())) {
                processVideo(savedVideo.getVideoId());
            }

            return savedVideo;

        } catch(IOException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Video get(String videoId) {
        Video video = videoRepository.findById(videoId).orElseThrow(() -> new RuntimeException("Video not found"));
        return video;
    }

    @Override
    public Video getByTitle(String title) {
        return videoRepository.findByTitle(title).orElse(null);
    }

    @Override
    public List<Video> getAll() {
        return videoRepository.findAll();
    }

    @Override
    public List<Video> getAllByType(String fileType) {
        return videoRepository.findByFileType(fileType);
    }

    @Override
    public List<Video> searchByTitle(String title, String fileType) {
        return videoRepository.findByTitleContainingIgnoreCaseAndFileType(title, fileType);
    }

    @Override
    public String processVideo(String videoId) {
        Video video = this.get(videoId);
        String filePath = video.getFilePath();

        try {
            Path videoPath = Paths.get(video.getFilePath()).normalize().toAbsolutePath();
            Path outputPath = Paths.get(HSL_DIR).normalize().toAbsolutePath().resolve(videoId);

            Files.createDirectories(outputPath);

            String ffmpegCmd = String.format(
                    "ffmpeg -i \"%s\" -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename \"%s/segment_%%3d.ts\"  \"%s/master.m3u8\" ",
                    videoPath, outputPath, outputPath
            );

            System.out.println(ffmpegCmd);
            ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", ffmpegCmd);
            processBuilder.inheritIO();
            Process process = processBuilder.start();
            int exit = process.waitFor();
            if (exit != 0) {
                throw new RuntimeException("video processing failed!!");
            }

            return videoId;

        } catch (IOException e) {
            throw new RuntimeException("Video Processing Failed");
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}