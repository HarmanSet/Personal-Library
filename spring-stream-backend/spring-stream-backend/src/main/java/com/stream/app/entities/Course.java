package com.stream.app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="courses")
public class Course {

    @Id
    private String id;
    private String Title;

//    @OneToMany(mappedBy = "course")
//    private List<Video> list=new ArrayList<>();
}
