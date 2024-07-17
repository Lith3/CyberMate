create table user (
  id int unsigned primary key auto_increment not null,
  username varchar(20) NOT NULL UNIQUE,
  email varchar(255) not null unique,
  password varchar(255) not null,
  role varchar(20) default "user"
);

create table topic (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  date DATE NOT NULL,
  subject VARCHAR(255) not null,
  foreign key(user_id) references user(id)
);

create table message (
  id int unsigned primary key auto_increment not null,
  user_id int unsigned not null,
  date DATE NOT NULL,
  content text not null,
  topic_id int unsigned not null,
  foreign key (user_id) references user(id),
    FOREIGN KEY (topic_id) references topic(id)
);