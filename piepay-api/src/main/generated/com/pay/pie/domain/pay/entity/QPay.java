package com.pay.pie.domain.pay.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPay is a Querydsl query type for Pay
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPay extends EntityPathBase<Pay> {

    private static final long serialVersionUID = -349414632L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPay pay = new QPay("pay");

    public final com.pay.pie.domain.QBaseEntity _super = new com.pay.pie.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.pay.pie.domain.meet.entity.QMeet meet;

    public final NumberPath<Long> openerId = createNumber("openerId", Long.class);

    public final EnumPath<Pay.PayStatus> payStatus = createEnum("payStatus", Pay.PayStatus.class);

    public final NumberPath<Long> totalPayAmount = createNumber("totalPayAmount", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QPay(String variable) {
        this(Pay.class, forVariable(variable), INITS);
    }

    public QPay(Path<? extends Pay> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPay(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPay(PathMetadata metadata, PathInits inits) {
        this(Pay.class, metadata, inits);
    }

    public QPay(Class<? extends Pay> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.meet = inits.isInitialized("meet") ? new com.pay.pie.domain.meet.entity.QMeet(forProperty("meet")) : null;
    }

}

