--创建test数据库
CREATE DATABASE test
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Chinese (Simplified)_China.936'
    LC_CTYPE = 'Chinese (Simplified)_China.936'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


--创建tips表
CREATE TABLE public.tips
(
    id integer NOT NULL DEFAULT nextval('tips_id_seq'::regclass),
    title text COLLATE pg_catalog."default",
    content text COLLATE pg_catalog."default",
    CONSTRAINT tips_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tips
    OWNER to postgres;

-------------------------------------------------------------------数据分析的echarts图表
CREATE TABLE public.analysis_data
(
    id integer NOT NULL DEFAULT nextval('analysisd_ata_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    money integer,
    createtime timestamp(6) without time zone,
    CONSTRAINT analysisd_ata_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.analysis_data
    OWNER to postgres;