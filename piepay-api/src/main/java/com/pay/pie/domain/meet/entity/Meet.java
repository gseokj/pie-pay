package com.pay.pie.domain.meet.entity;

import java.util.UUID;

import com.pay.pie.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Getter
@Table(name = "meet", uniqueConstraints = @UniqueConstraint(columnNames = "meet_invitation"))
public class Meet extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "meet_id", updatable = false) // nullable = false 없애고 updatable = false 추가
	private Long id;

	@Size(max = 50)
	@NotNull
	@Column(name = "meet_name", nullable = false, length = 50)
	private String meetName;

	@Size(max = 200)
	@Column(name = "meet_image", length = 200)
	private String meetImage;

	@Size(max = 10)
	@NotNull
	@Column(name = "meet_invitation", nullable = false, length = 10)
	private String meetInvitation;

	@Builder // 빌더 패턴으로 객체 생성
	public Meet(String meetName, String meetImage) {
		this.meetName = meetName;
		this.meetImage = meetImage;
		this.meetInvitation = UUID.randomUUID().toString().substring(0, 6);
	}

	public void updateInvitation() {
		this.meetInvitation = UUID.randomUUID().toString().substring(0, 6);
	}

	public void updateMeetImage(String meetImage) {
		this.meetImage = meetImage;
	}

	public void updateMeetName(String meetName) {
		this.meetName = meetName;
	}
}