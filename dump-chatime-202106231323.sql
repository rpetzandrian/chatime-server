PGDMP     ;                    y            chatime     12.7 (Ubuntu 12.7-1.pgdg20.04+1)     13.3 (Ubuntu 13.3-1.pgdg20.04+1) ;    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17007    chatime    DATABASE     \   CREATE DATABASE chatime WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE chatime;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            �            1259    17008    call_history    TABLE     �   CREATE TABLE public.call_history (
    id bigint NOT NULL,
    "from" bigint,
    "to" bigint,
    is_missed boolean,
    is_rejected boolean,
    "timestamp" timestamp(0) without time zone
);
     DROP TABLE public.call_history;
       public         heap    postgres    false    3            �            1259    17011    call_history_id_seq    SEQUENCE     �   ALTER TABLE public.call_history ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.call_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    3    202            �            1259    17013    chatroom_members    TABLE     �   CREATE TABLE public.chatroom_members (
    id bigint NOT NULL,
    chatroom_id bigint NOT NULL,
    user_id bigint NOT NULL,
    is_pinned boolean,
    is_saved boolean
);
 $   DROP TABLE public.chatroom_members;
       public         heap    postgres    false    3            �            1259    17016    chatroom_members_id_seq    SEQUENCE     �   ALTER TABLE public.chatroom_members ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.chatroom_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    204    3            �            1259    17018 	   chatrooms    TABLE     �   CREATE TABLE public.chatrooms (
    id bigint NOT NULL,
    "timestamp" timestamp(0) without time zone,
    lastmessage bigint
);
    DROP TABLE public.chatrooms;
       public         heap    postgres    false    3            �            1259    17021    chatrooms_id_seq    SEQUENCE     �   ALTER TABLE public.chatrooms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.chatrooms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    3    206            �            1259    17023    contacts    TABLE     �   CREATE TABLE public.contacts (
    id bigint NOT NULL,
    user_id bigint,
    friend_id bigint,
    friend_name character varying(255)
);
    DROP TABLE public.contacts;
       public         heap    postgres    false    3            �            1259    17026    contacts_id_seq    SEQUENCE     �   ALTER TABLE public.contacts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    208    3            �            1259    17028    message_doc    TABLE     `   CREATE TABLE public.message_doc (
    message_id bigint,
    document character varying(255)
);
    DROP TABLE public.message_doc;
       public         heap    postgres    false    3            �            1259    17031    message_file    TABLE     ]   CREATE TABLE public.message_file (
    message_id bigint,
    file character varying(255)
);
     DROP TABLE public.message_file;
       public         heap    postgres    false    3            �            1259    17034    message_img    TABLE     ^   CREATE TABLE public.message_img (
    message_id bigint,
    images character varying(255)
);
    DROP TABLE public.message_img;
       public         heap    postgres    false    3            �            1259    17037    message_loc    TABLE     |   CREATE TABLE public.message_loc (
    message_id bigint,
    long character varying(255),
    lat character varying(255)
);
    DROP TABLE public.message_loc;
       public         heap    postgres    false    3            �            1259    17043    messages    TABLE     �   CREATE TABLE public.messages (
    id bigint NOT NULL,
    chatroom_id bigint NOT NULL,
    sender bigint NOT NULL,
    text text,
    is_read boolean,
    "timestamp" timestamp(0) without time zone
);
    DROP TABLE public.messages;
       public         heap    postgres    false    3            �            1259    17049    messages_id_seq    SEQUENCE     �   ALTER TABLE public.messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    3    214            �            1259    17051    user_status    TABLE     X   CREATE TABLE public.user_status (
    user_id bigint NOT NULL,
    is_online boolean
);
    DROP TABLE public.user_status;
       public         heap    postgres    false    3            �            1259    17054    users    TABLE     �  CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255),
    username character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(20) NOT NULL,
    photo character varying(255),
    bio character varying(255),
    created_at date,
    updated_at date,
    is_admin boolean DEFAULT false
);
    DROP TABLE public.users;
       public         heap    postgres    false    3            �            1259    17061    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public          postgres    false    3    217            �          0    17008    call_history 
   TABLE DATA           ]   COPY public.call_history (id, "from", "to", is_missed, is_rejected, "timestamp") FROM stdin;
    public          postgres    false    202            �          0    17013    chatroom_members 
   TABLE DATA           Y   COPY public.chatroom_members (id, chatroom_id, user_id, is_pinned, is_saved) FROM stdin;
    public          postgres    false    204            �          0    17018 	   chatrooms 
   TABLE DATA           A   COPY public.chatrooms (id, "timestamp", lastmessage) FROM stdin;
    public          postgres    false    206            �          0    17023    contacts 
   TABLE DATA           G   COPY public.contacts (id, user_id, friend_id, friend_name) FROM stdin;
    public          postgres    false    208            �          0    17028    message_doc 
   TABLE DATA           ;   COPY public.message_doc (message_id, document) FROM stdin;
    public          postgres    false    210            �          0    17031    message_file 
   TABLE DATA           8   COPY public.message_file (message_id, file) FROM stdin;
    public          postgres    false    211            �          0    17034    message_img 
   TABLE DATA           9   COPY public.message_img (message_id, images) FROM stdin;
    public          postgres    false    212            �          0    17037    message_loc 
   TABLE DATA           <   COPY public.message_loc (message_id, long, lat) FROM stdin;
    public          postgres    false    213            �          0    17043    messages 
   TABLE DATA           W   COPY public.messages (id, chatroom_id, sender, text, is_read, "timestamp") FROM stdin;
    public          postgres    false    214            �          0    17051    user_status 
   TABLE DATA           9   COPY public.user_status (user_id, is_online) FROM stdin;
    public          postgres    false    216            �          0    17054    users 
   TABLE DATA           y   COPY public.users (id, name, username, email, password, phone, photo, bio, created_at, updated_at, is_admin) FROM stdin;
    public          postgres    false    217            �           0    0    call_history_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.call_history_id_seq', 1, false);
          public          postgres    false    203            �           0    0    chatroom_members_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.chatroom_members_id_seq', 2, true);
          public          postgres    false    205            �           0    0    chatrooms_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.chatrooms_id_seq', 1, true);
          public          postgres    false    207            �           0    0    contacts_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.contacts_id_seq', 1, true);
          public          postgres    false    209            �           0    0    messages_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.messages_id_seq', 72, true);
          public          postgres    false    215            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 4, true);
          public          postgres    false    218            %           2606    17064    call_history call_history_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.call_history
    ADD CONSTRAINT call_history_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.call_history DROP CONSTRAINT call_history_pkey;
       public            postgres    false    202            '           2606    17066 &   chatroom_members chatroom_members_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.chatroom_members
    ADD CONSTRAINT chatroom_members_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.chatroom_members DROP CONSTRAINT chatroom_members_pkey;
       public            postgres    false    204            )           2606    17068    chatrooms chatrooms_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.chatrooms
    ADD CONSTRAINT chatrooms_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.chatrooms DROP CONSTRAINT chatrooms_pkey;
       public            postgres    false    206            +           2606    17070    contacts contacts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.contacts DROP CONSTRAINT contacts_pkey;
       public            postgres    false    208            /           2606    17072    users email 
   CONSTRAINT     G   ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email);
 5   ALTER TABLE ONLY public.users DROP CONSTRAINT email;
       public            postgres    false    217            1           2606    17074    users id 
   CONSTRAINT     F   ALTER TABLE ONLY public.users
    ADD CONSTRAINT id PRIMARY KEY (id);
 2   ALTER TABLE ONLY public.users DROP CONSTRAINT id;
       public            postgres    false    217            -           2606    17076    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    214            3           2606    17078    users phone 
   CONSTRAINT     G   ALTER TABLE ONLY public.users
    ADD CONSTRAINT phone UNIQUE (phone);
 5   ALTER TABLE ONLY public.users DROP CONSTRAINT phone;
       public            postgres    false    217            <           2606    17079    messages chatroom    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT chatroom FOREIGN KEY (chatroom_id) REFERENCES public.chatrooms(id) ON DELETE CASCADE NOT VALID;
 ;   ALTER TABLE ONLY public.messages DROP CONSTRAINT chatroom;
       public          postgres    false    214    2857    206            6           2606    17084    chatroom_members chatroom_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.chatroom_members
    ADD CONSTRAINT chatroom_id FOREIGN KEY (chatroom_id) REFERENCES public.chatrooms(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.chatroom_members DROP CONSTRAINT chatroom_id;
       public          postgres    false    206    2857    204            7           2606    17089    contacts friend    FK CONSTRAINT     �   ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT friend FOREIGN KEY (friend_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;
 9   ALTER TABLE ONLY public.contacts DROP CONSTRAINT friend;
       public          postgres    false    208    2865    217            4           2606    17094    call_history from    FK CONSTRAINT     w   ALTER TABLE ONLY public.call_history
    ADD CONSTRAINT "from" FOREIGN KEY (id) REFERENCES public.users(id) NOT VALID;
 =   ALTER TABLE ONLY public.call_history DROP CONSTRAINT "from";
       public          postgres    false    202    2865    217            ;           2606    17099    message_img id    FK CONSTRAINT     �   ALTER TABLE ONLY public.message_img
    ADD CONSTRAINT id FOREIGN KEY (message_id) REFERENCES public.messages(id) ON DELETE CASCADE NOT VALID;
 8   ALTER TABLE ONLY public.message_img DROP CONSTRAINT id;
       public          postgres    false    2861    212    214            9           2606    17104    message_doc id    FK CONSTRAINT     �   ALTER TABLE ONLY public.message_doc
    ADD CONSTRAINT id FOREIGN KEY (message_id) REFERENCES public.messages(id) ON DELETE CASCADE NOT VALID;
 8   ALTER TABLE ONLY public.message_doc DROP CONSTRAINT id;
       public          postgres    false    214    210    2861            :           2606    17109    message_file id    FK CONSTRAINT     �   ALTER TABLE ONLY public.message_file
    ADD CONSTRAINT id FOREIGN KEY (message_id) REFERENCES public.messages(id) ON DELETE CASCADE NOT VALID;
 9   ALTER TABLE ONLY public.message_file DROP CONSTRAINT id;
       public          postgres    false    211    2861    214            =           2606    17114    messages sender    FK CONSTRAINT     w   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT sender FOREIGN KEY (sender) REFERENCES public.users(id) NOT VALID;
 9   ALTER TABLE ONLY public.messages DROP CONSTRAINT sender;
       public          postgres    false    214    2865    217            5           2606    17119    call_history to    FK CONSTRAINT     u   ALTER TABLE ONLY public.call_history
    ADD CONSTRAINT "to" FOREIGN KEY (id) REFERENCES public.users(id) NOT VALID;
 ;   ALTER TABLE ONLY public.call_history DROP CONSTRAINT "to";
       public          postgres    false    217    202    2865            8           2606    17124    contacts user    FK CONSTRAINT     �   ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT "user" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;
 9   ALTER TABLE ONLY public.contacts DROP CONSTRAINT "user";
       public          postgres    false    217    2865    208            >           2606    17129    user_status user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_status
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 =   ALTER TABLE ONLY public.user_status DROP CONSTRAINT user_id;
       public          postgres    false    2865    217    216            �      x������ � �      �      x�3�4�4�4.# mf��qqq 1��      �   &   x�3�4202�50�52R04�24�20�47����� R      �      x�3�4�4�,-N-2����� 1S      �      x������ � �      �      x������ � �      �     x����N�0Ek�[B1af��-t+h�h��(��<���?QRb�4�\]��kW��s�U�~���GH4?�e!�Z$ApK~��֣0���y��--��^j0�a���0'�@��ҙM
f�v����4Y͒�ٚ��5�v]�%���5t{:&/��`����!�u���D=B�r?�~����Z���)��*��&�Q'A���ٷ}e�O�E�34��~��9�}mSHE|�粛n�.ƀ�g���+ϲ��      �      x������ � �      �   z  x����n�0����:�N�<Ğ�7ъ�i?� ����IZ*J�"w���918ܥg�q7�H�ݓi�V�G��������M�7��0�S7�fO� � /	��2���=��$���8�.u����N�~�y�����g���J(���R�V���}���ͯ�A�k�٠0 ����@ߨ6h�Q�L��_�Ɛ]��c�`����,��AΟ]3�rg<$7��E�=#{
m���4��dRzU-�d��̜�PH���ݒ����[��D`�����H�b��E� W۵de�����H􌓓a��
�SF��HA+`��~9C��$^S�^�֢�6}F����2�DH��e�k I	�2�M)r��rJȕ���'98� �?w*�      �      x�3�L�2�,�2b# ����� )�      �   r  x�u�]o�0�k��
�i���pN��`3&�
�������'qYL��I�ޜ�-6�NY�>���V�s��F�U���ف���8�5h��t�
CW����iM'ͱ}���V�z�H` �θ���!Z(oQ�ܩ�A������]��ʋ=.��\MrP\#7`H��k�>�<�8z����z��;V�W��ב��o��s�[�����?�du��A't�a��GC;y�@CYn\��.��`��$�m���[�������>f��/�ύ�f޸�.2����y;w�Q���7���RpV�����V��JW���f�?`�a���3 �Ἆ�8�q�
.9��:�`@g;3N��i�^�vd5�DS�R���U     