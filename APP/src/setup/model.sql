-- initialization (just copy and paste)

-- connect to another db
\c postgres;

-- drop database if exists
drop database if exists youtube;

-- create database youtube
create database youtube;

-- connect to database youtube
\c youtube;

----------------------------------------------------------
-- model

-- extensions
create extension if not exists "uuid-ossp";

-- users table
drop table if exists users;
create table users (
    user_id uuid default uuid_generate_v4() primary key,
    user_name character varying(255) not null,
    user_password text,
    user_avatar text,
    user_created_at timestamptz default current_timestamp,
    user_deleted_at timestamptz default null
);

-- videos table
drop table if exists videos;
create table videos (
    video_id uuid default uuid_generate_v4() primary key,
    user_id uuid not null references users(user_id),
    video_link int default 1,
    video_created_at timestamptz default current_timestamp,
    video_deleted_at timestamptz default null 
);