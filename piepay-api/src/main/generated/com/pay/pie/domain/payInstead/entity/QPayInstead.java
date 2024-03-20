package com.pay.pie.domain.payInstead.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPayInstead is a Querydsl query type for PayInstead
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPayInstead extends EntityPathBase<PayInstead> {

    private static final long serialVersionUID = 971714150L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPayInstead payInstead = new QPayInstead("payInstead");

    public final com.pay.pie.domain.QBaseEntity _super = new com.pay.pie.domain.QBaseEntity(this);

    public final NumberPath<Long> amount = createNumber("amount", Long.class);

    public final com.pay.pie.domain.member.entity.QMember borrower;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isPayback = createBoolean("isPayback");

    public final com.pay.pie.domain.member.entity.QMember lender;

    public final com.pay.pie.domain.pay.entity.QPay pay;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QPayInstead(String variable) {
        this(PayInstead.class, forVariable(variable), INITS);
    }

    public QPayInstead(Path<? extends PayInstead> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPayInstead(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPayInstead(PathMetadata metadata, PathInits inits) {
        this(PayInstead.class, metadata, inits);
    }

    public QPayInstead(Class<? extends PayInstead> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.borrower = inits.isInitialized("borrower") ? new com.pay.pie.domain.member.entity.QMember(forProperty("borrower")) : null;
        this.lender = inits.isInitialized("lender") ? new com.pay.pie.domain.member.entity.QMember(forProperty("lender")) : null;
        this.pay = inits.isInitialized("pay") ? new com.pay.pie.domain.pay.entity.QPay(forProperty("pay"), inits.get("pay")) : null;
    }

}

