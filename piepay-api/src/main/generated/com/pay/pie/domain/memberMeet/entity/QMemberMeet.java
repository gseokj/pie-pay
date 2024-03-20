package com.pay.pie.domain.memberMeet.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberMeet is a Querydsl query type for MemberMeet
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberMeet extends EntityPathBase<MemberMeet> {

    private static final long serialVersionUID = -1535505484L;

    public static final QMemberMeet memberMeet = new QMemberMeet("memberMeet");

    public final com.pay.pie.domain.QBaseEntity _super = new com.pay.pie.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> meetId = createNumber("meetId", Long.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QMemberMeet(String variable) {
        super(MemberMeet.class, forVariable(variable));
    }

    public QMemberMeet(Path<? extends MemberMeet> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberMeet(PathMetadata metadata) {
        super(MemberMeet.class, metadata);
    }

}

