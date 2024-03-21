package com.pay.pie.domain.participant.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QParticipant is a Querydsl query type for Participant
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QParticipant extends EntityPathBase<Participant> {

    private static final long serialVersionUID = -624579528L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QParticipant participant = new QParticipant("participant");

    public final com.pay.pie.domain.QBaseEntity _super = new com.pay.pie.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isDrinkAlcohol = createBoolean("isDrinkAlcohol");

    public final com.pay.pie.domain.member.entity.QMember member;

    public final com.pay.pie.domain.pay.entity.QPay pay;

    public final BooleanPath payAgree = createBoolean("payAgree");

    public final NumberPath<Long> payAmount = createNumber("payAmount", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QParticipant(String variable) {
        this(Participant.class, forVariable(variable), INITS);
    }

    public QParticipant(Path<? extends Participant> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QParticipant(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QParticipant(PathMetadata metadata, PathInits inits) {
        this(Participant.class, metadata, inits);
    }

    public QParticipant(Class<? extends Participant> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.pay.pie.domain.member.entity.QMember(forProperty("member")) : null;
        this.pay = inits.isInitialized("pay") ? new com.pay.pie.domain.pay.entity.QPay(forProperty("pay"), inits.get("pay")) : null;
    }

}

