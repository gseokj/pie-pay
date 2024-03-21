package com.pay.pie.domain.order.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOrder is a Querydsl query type for Order
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOrder extends EntityPathBase<Order> {

    private static final long serialVersionUID = 1817516952L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOrder order = new QOrder("order1");

    public final com.pay.pie.domain.QBaseEntity _super = new com.pay.pie.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.pay.pie.domain.pay.entity.QPay pay;

    public final EnumPath<Order.PaymentStatus> paymentStatus = createEnum("paymentStatus", Order.PaymentStatus.class);

    public final com.pay.pie.domain.store.entity.QStore store;

    public final NumberPath<Long> totalAmount = createNumber("totalAmount", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QOrder(String variable) {
        this(Order.class, forVariable(variable), INITS);
    }

    public QOrder(Path<? extends Order> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOrder(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOrder(PathMetadata metadata, PathInits inits) {
        this(Order.class, metadata, inits);
    }

    public QOrder(Class<? extends Order> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pay = inits.isInitialized("pay") ? new com.pay.pie.domain.pay.entity.QPay(forProperty("pay"), inits.get("pay")) : null;
        this.store = inits.isInitialized("store") ? new com.pay.pie.domain.store.entity.QStore(forProperty("store")) : null;
    }

}

