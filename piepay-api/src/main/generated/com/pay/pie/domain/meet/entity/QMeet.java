package com.pay.pie.domain.meet.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMeet is a Querydsl query type for Meet
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeet extends EntityPathBase<Meet> {

    private static final long serialVersionUID = -408664768L;

    public static final QMeet meet = new QMeet("meet");

    public final com.pay.pie.domain.QBaseEntity _super = new com.pay.pie.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath meetImage = createString("meetImage");

    public final StringPath meetInvitation = createString("meetInvitation");

    public final StringPath meetName = createString("meetName");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QMeet(String variable) {
        super(Meet.class, forVariable(variable));
    }

    public QMeet(Path<? extends Meet> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMeet(PathMetadata metadata) {
        super(Meet.class, metadata);
    }

}

