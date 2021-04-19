create extension if not exists "uuid-ossp";

create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
    description text,
    price integer
);

create table stocks (
	id uuid primary key default uuid_generate_v4(),
	product_id uuid,
	UNIQUE(product_id),
    FOREIGN KEY(product_id) REFERENCES products(id),
    count integer
);

drop table stocks;

insert into products (title, description, price) values
	('Math', 'Learn everything from Algebra 1 and Algebra 2, then test your knowledge with', 17.99),
	('German Language', 'Learn German with a Native Teacher. Complete Course - German for Beginners', 12.99);

insert into stocks (product_id, count) values
	((select id from products where title = 'Math'), 30),
	((select id from products where title = 'German Language'), 50);
