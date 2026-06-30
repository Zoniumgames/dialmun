
        const flags = {
            "Alemania": "de", "Paraguay": "py", "Francia": "fr", "Suecia": "se",
            "Sudáfrica": "za", "Canadá": "ca", "Países Bajos": "nl", "Marruecos": "ma",
            "Portugal": "pt", "Ghana": "gh", "España": "es", "Austria": "at",
            "Estados Unidos": "us", "Bosnia Herzegovina": "ba", "Egipto": "eg", "Corea del Sur": "kr",
            "Brasil": "br", "Japón": "jp", "Costa de Marfil": "ci", "Noruega": "no",
            "México": "mx", "Escocia": "gb-sct", "Inglaterra": "gb-eng", "Ecuador": "ec",
            "Argentina": "ar", "Uruguay": "uy", "Australia": "au", "Irán": "ir",
            "Suiza": "ch", "Argelia": "dz", "Colombia": "co", "Croacia": "hr", 
            "República Democrática del Congo": "cd",
            "Cabo Verde": "cv",
            "Bélgica": "be",
            "Senegal": "sn",
            "?": "unknown"
        };

        const initialMatchesLeft = [
            { id: "L_16_1", team1: "Alemania", team2: "Paraguay" }, { id: "L_16_2", team1: "Francia", team2: "Suecia" },
            { id: "L_16_3", team1: "Sudáfrica", team2: "Canadá" }, { id: "L_16_4", team1: "Países Bajos", team2: "Marruecos" },
            { id: "L_16_5", team1: "Portugal", team2: "Croacia" }, { id: "L_16_6", team1: "España", team2: "Austria" },
            { id: "L_16_7", team1: "Estados Unidos", team2: "Bosnia Herzegovina" }, { id: "L_16_8", team1: "Bélgica", team2: "Senegal" }
        ];

        const initialMatchesRight = [
            { id: "R_16_1", team1: "Brasil", team2: "Japón" }, { id: "R_16_2", team1: "Costa de Marfil", team2: "Noruega" },
            { id: "R_16_3", team1: "México", team2: "Ecuador" }, { id: "R_16_4", team1: "Inglaterra", team2: "República Democrática del Congo" },
            { id: "R_16_5", team1: "Argentina", team2: "Cabo Verde" }, { id: "R_16_6", team1: "Australia", team2: "Egipto" },
            { id: "R_16_7", team1: "Suiza", team2: "Argelia" }, { id: "R_16_8", team1: "Colombia", team2: "Ghana" }
        ];

        const progressionMap = {
            "L_16_1": { next: "L_8_1", slot: 1 }, "L_16_2": { next: "L_8_1", slot: 2 },
            "L_16_3": { next: "L_8_2", slot: 1 }, "L_16_4": { next: "L_8_2", slot: 2 },
            "L_16_5": { next: "L_8_3", slot: 1 }, "L_16_6": { next: "L_8_3", slot: 2 },
            "L_16_7": { next: "L_8_4", slot: 1 }, "L_16_8": { next: "L_8_4", slot: 2 },
            "L_8_1": { next: "L_4_1", slot: 1 }, "L_8_2": { next: "L_4_1", slot: 2 },
            "L_8_3": { next: "L_4_2", slot: 1 }, "L_8_4": { next: "L_4_2", slot: 2 },
            "L_4_1": { next: "L_2_1", slot: 1 }, "L_4_2": { next: "L_2_1", slot: 2 },
            "L_2_1": { next: "FINAL", slot: 1 },

            "R_16_1": { next: "R_8_1", slot: 1 }, "R_16_2": { next: "R_8_1", slot: 2 },
            "R_16_3": { next: "R_8_2", slot: 1 }, "R_16_4": { next: "R_8_2", slot: 2 },
            "R_16_5": { next: "R_8_3", slot: 1 }, "R_16_6": { next: "R_8_3", slot: 2 },
            "R_16_7": { next: "R_8_4", slot: 1 }, "R_16_8": { next: "R_8_4", slot: 2 },
            "R_8_1": { next: "R_4_1", slot: 1 }, "R_8_2": { next: "R_4_1", slot: 2 },
            "R_8_3": { next: "R_4_2", slot: 1 }, "R_8_4": { next: "R_4_2", slot: 2 },
            "R_4_1": { next: "R_2_1", slot: 1 }, "R_4_2": { next: "R_2_1", slot: 2 },
            "R_2_1": { next: "FINAL", slot: 2 },
            "FINAL": { next: "CHAMPION", slot: 0 }
        };

        function getFlagUrl(countryName) {
            const code = flags[countryName];
            if (!code || code === "unknown") {
                return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='16'><rect width='100%' height='100%' fill='%231e293b'/></svg>";
            }
            return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
        }

        function createMatchHTML(id, team1 = "?", team2 = "?") {
            let arrowIcon = id.startsWith("R") ? "🡸" : "🡺";
            if (id === "FINAL") arrowIcon = "🡻";

            const isDisabled = (team1 === '?' || team2 === '?');
            return `
                <div class="matchup" id="match-${id}">
                    <div class="team" id="team-${id}-t1">
                        <div class="team-info">
                            <img src="${getFlagUrl(team1)}" class="flag" id="flag-${id}-t1" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'16\'><rect width=\'100%\' height=\'100%\' fill=\'%231e293b\'/></svg>'">
                            <span id="name-${id}-t1">${team1}</span>
                        </div>
                        <input type="number" min="0" class="score-input" id="score-${id}-t1" ${isDisabled ? 'disabled' : ''}>
                    </div>
                    <div class="team" id="team-${id}-t2">
                        <div class="team-info">
                            <img src="${getFlagUrl(team2)}" class="flag" id="flag-${id}-t2" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'16\'><rect width=\'100%\' height=\'100%\' fill=\'%231e293b\'/></svg>'">
                            <span id="name-${id}-t2">${team2}</span>
                        </div>
                        <input type="number" min="0" class="score-input" id="score-${id}-t2" ${isDisabled ? 'disabled' : ''}>
                    </div>
                    <div class="match-actions">
                        <button class="btn btn-win" onclick="resolveMatch('${id}')" ${isDisabled ? 'disabled' : ''}>${arrowIcon}</button>
                        <button class="btn btn-reset" onclick="resetMatch('${id}')">✕</button>
                    </div>
                </div>
            `;
        }

        function buildInitialRound(containerId, dataList) {
            const container = document.getElementById(containerId);
            for (let i = 0; i < dataList.length; i += 2) {
                container.innerHTML += `
                    <div class="match-pair">
                        ${createMatchHTML(dataList[i].id, dataList[i].team1, dataList[i].team2)}
                        ${createMatchHTML(dataList[i+1].id, dataList[i+1].team1, dataList[i+1].team2)}
                    </div>`;
            }
        }

        function buildEmptyRound(containerId, count, prefix) {
            const container = document.getElementById(containerId);
            for (let i = 1; i <= count; i += 2) {
                container.innerHTML += `
                    <div class="match-pair">
                        ${createMatchHTML(`${prefix}_${i}`)}
                        ${createMatchHTML(`${prefix}_${i+1}`)}
                    </div>`;
            }
        }

        function initBracket() {
            buildInitialRound("round1-left", initialMatchesLeft);
            buildInitialRound("round1-right", initialMatchesRight);
            buildEmptyRound("round2-left", 4, "L_8");
            buildEmptyRound("round2-right", 4, "R_8");
            buildEmptyRound("round3-left", 2, "L_4");
            buildEmptyRound("round3-right", 2, "R_4");

            document.getElementById("round4-left").innerHTML = `<div class="match-pair">${createMatchHTML("L_2_1")}</div>`;
            document.getElementById("round4-right").innerHTML = `<div class="match-pair">${createMatchHTML("R_2_1")}</div>`;
            document.getElementById("final-match-container").innerHTML = createMatchHTML("FINAL");
            
            resetView(); 
            loadBracketState();
            registerScoreInputValidations();
        }

        function registerScoreInputValidations() {
            document.addEventListener('input', (e) => {
                if (e.target.classList.contains('score-input')) {
                    if (e.target.value < 0) e.target.value = 0;
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }
            });
        }

        /* ========================================================
           LÓGICA DE NAVEGACIÓN "PAN & ZOOM" (COMPATIBLE TÁCTIL)
        ======================================================== */
        const viewport = document.getElementById('viewport');
        const container = document.getElementById('bracketContainer');

        let scale = 0.55; 
        let posX = 0;
        let posY = 40; 
        let isDragging = false;
        let startX, startY;

        function updateTransform() {
            container.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
        }

        window.addEventListener('pointerdown', (e) => {
            if (e.target.closest('.matchup') || e.target.closest('.control-panel') || e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
            isDragging = true;
            startX = e.clientX - posX;
            startY = e.clientY - posY;
            viewport.style.cursor = 'grabbing';
            viewport.setPointerCapture(e.pointerId);
        });

        window.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            posX = e.clientX - startX;
            posY = e.clientY - startY;
            updateTransform();
        });

        window.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            viewport.style.cursor = 'grab';
            viewport.releasePointerCapture(e.pointerId);
        });

        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomSpeed = 0.05;
            if (e.deltaY < 0) {
                scale = Math.min(scale + zoomSpeed, 1.8);
            } else {
                scale = Math.max(scale - zoomSpeed, 0.25);
            }
            updateTransform();
        }, { passive: false });

        window.addEventListener('dblclick', (e) => {
            if (e.target.closest('.matchup') || e.target.closest('.control-panel')) return;
            resetView();
        });

        function zoomIn() {
            scale = Math.min(scale + 0.1, 1.8);
            updateTransform();
        }

        function zoomOut() {
            scale = Math.max(scale - 0.1, 0.25);
            updateTransform();
        }

        function resetView() {
            scale = window.innerWidth < 1800 ? 0.45 : 0.6;
            posX = 0;
            posY = 50;
            updateTransform();
        }

        window.addEventListener('resize', () => {
            if (!isDragging) resetView();
        });

        /* ========================================================
           LÓGICA DEL TORNEO
        ======================================================== */
        function resolveMatch(matchId) {
            const score1Input = document.getElementById(`score-${matchId}-t1`);
            const score2Input = document.getElementById(`score-${matchId}-t2`);
            if (!score1Input || !score2Input) return;

            const score1 = parseInt(score1Input.value);
            const score2 = parseInt(score2Input.value);
            const team1 = document.getElementById(`name-${matchId}-t1`).innerText;
            const team2 = document.getElementById(`name-${matchId}-t2`).innerText;

            if (isNaN(score1) || isNaN(score2)) return alert("Por favor, ingresa los goles.");
            if (score1 === score2) return alert("Debe haber un ganador (Desempata añadiendo el gol decisivo).");

            const winner = score1 > score2 ? team1 : team2;
            const config = progressionMap[matchId];

            const t1Row = document.getElementById(`team-${matchId}-t1`);
            const t2Row = document.getElementById(`team-${matchId}-t2`);

            if (score1 > score2) {
                t1Row.classList.add('winner-row'); t1Row.classList.remove('loser-row');
                t2Row.classList.add('loser-row'); t2Row.classList.remove('winner-row');
            } else {
                t2Row.classList.add('winner-row'); t2Row.classList.remove('loser-row');
                t1Row.classList.add('loser-row'); t1Row.classList.remove('winner-row');
            }

            if (config.next === "CHAMPION") {
                document.getElementById("champion-display").innerHTML = `<img src="${getFlagUrl(winner)}" class="flag" style="width:30px; height:20px;"> ${winner}`;
            } else {
                const nextId = config.next;
                const slot = config.slot;
                document.getElementById(`name-${nextId}-t${slot}`).innerText = winner;
                document.getElementById(`flag-${nextId}-t${slot}`).src = getFlagUrl(winner);

                const partnerSlot = slot === 1 ? 2 : 1;
                const partner = document.getElementById(`name-${nextId}-t${partnerSlot}`).innerText;
                if (partner !== "?") {
                    document.getElementById(`score-${nextId}-t1`).disabled = false;
                    document.getElementById(`score-${nextId}-t2`).disabled = false;
                    const btn = document.querySelector(`#match-${nextId} .btn-win`);
                    if (btn) btn.disabled = false;
                }
            }
            document.getElementById(`match-${matchId}`).classList.add("locked");

            saveBracketState();
        }

        function resetMatch(matchId) {
            const s1 = document.getElementById(`score-${matchId}-t1`);
            const s2 = document.getElementById(`score-${matchId}-t2`);
            if (s1) s1.value = "";
            if (s2) s2.value = "";

            const matchCard = document.getElementById(`match-${matchId}`);
            if (matchCard) matchCard.classList.remove("locked");

            const t1Row = document.getElementById(`team-${matchId}-t1`);
            const t2Row = document.getElementById(`team-${matchId}-t2`);
            if (t1Row) { t1Row.classList.remove('winner-row', 'loser-row'); }
            if (t2Row) { t2Row.classList.remove('winner-row', 'loser-row'); }

            const config = progressionMap[matchId];
            if (!config) return;

            if (config.next === "CHAMPION") {
                document.getElementById("champion-display").innerText = "?";
            } else {
                const nextId = config.next;
                document.getElementById(`name-${nextId}-t${config.slot}`).innerText = "?";
                document.getElementById(`flag-${nextId}-t${config.slot}`).src = getFlagUrl("?");
                
                const nextS1 = document.getElementById(`score-${nextId}-t1`);
                const nextS2 = document.getElementById(`score-${nextId}-t2`);
                if (nextS1) nextS1.disabled = true;
                if (nextS2) nextS2.disabled = true;

                const btn = document.querySelector(`#match-${nextId} .btn-win`);
                if (btn) btn.disabled = true;

                resetMatch(nextId);
            }

            saveBracketState();
        }

        /* ========================================================
           INTERACTIVIDAD: DELEGACIÓN DE HOVER
        ======================================================== */
        document.addEventListener('mouseover', (e) => {
            const teamInfo = e.target.closest('.team-info');
            if (!teamInfo) return;
            const teamName = teamInfo.querySelector('span')?.innerText;
            if (!teamName || teamName === '?') return;

            document.querySelectorAll('.team-info').forEach(el => {
                if (el.querySelector('span')?.innerText === teamName) {
                    el.closest('.team').classList.add('highlight-team-row');
                }
            });
        });

        document.addEventListener('mouseout', (e) => {
            const teamInfo = e.target.closest('.team-info');
            if (!teamInfo) return;
            document.querySelectorAll('.team').forEach(el => {
                el.classList.remove('highlight-team-row');
            });
        });

        /* ========================================================
           PERSISTENCIA DE DATOS (LOCALSTORAGE)
        ======================================================== */
        function saveBracketState() {
            const state = {
                scores: {},
                names: {},
                flags: {},
                locked: [],
                winnerClasses: {}
            };

            document.querySelectorAll('.matchup').forEach(match => {
                const id = match.id.replace('match-', '');
                
                const s1 = document.getElementById(`score-${id}-t1`);
                const s2 = document.getElementById(`score-${id}-t2`);
                if (s1) state.scores[`score-${id}-t1`] = s1.value;
                if (s2) state.scores[`score-${id}-t2`] = s2.value;

                const n1 = document.getElementById(`name-${id}-t1`);
                const n2 = document.getElementById(`name-${id}-t2`);
                if (n1) state.names[`name-${id}-t1`] = n1.innerText;
                if (n2) state.names[`name-${id}-t2`] = n2.innerText;

                const f1 = document.getElementById(`flag-${id}-t1`);
                const f2 = document.getElementById(`flag-${id}-t2`);
                if (f1) state.flags[`flag-${id}-t1`] = f1.src;
                if (f2) state.flags[`flag-${id}-t2`] = f2.src;

                if (match.classList.contains('locked')) {
                    state.locked.push(id);
                }

                const t1Row = document.getElementById(`team-${id}-t1`);
                const t2Row = document.getElementById(`team-${id}-t2`);
                state.winnerClasses[id] = {
                    t1: t1Row ? Array.from(t1Row.classList) : [],
                    t2: t2Row ? Array.from(t2Row.classList) : []
                };
            });

            state.names['champion-display'] = document.getElementById('champion-display').innerHTML;
            localStorage.setItem('tids2026_bracket', JSON.stringify(state));
        }

        function loadBracketState() {
            const saved = localStorage.getItem('tids2026_bracket');
            if (!saved) return;

            const state = JSON.parse(saved);

            Object.keys(state.names).forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = state.names[id];
            });

            Object.keys(state.flags).forEach(id => {
                const el = document.getElementById(id);
                if (el) el.src = state.flags[id];
            });

            Object.keys(state.scores).forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = state.scores[id];
            });

            state.locked.forEach(id => {
                const match = document.getElementById(`match-${id}`);
                if (match) match.classList.add('locked');
            });

            if (state.winnerClasses) {
                Object.keys(state.winnerClasses).forEach(id => {
                    const t1Row = document.getElementById(`team-${id}-t1`);
                    const t2Row = document.getElementById(`team-${id}-t2`);
                    if (t1Row && state.winnerClasses[id].t1) {
                        t1Row.className = state.winnerClasses[id].t1.join(' ');
                    }
                    if (t2Row && state.winnerClasses[id].t2) {
                        t2Row.className = state.winnerClasses[id].t2.join(' ');
                    }
                });
            }

            document.querySelectorAll('.matchup').forEach(match => {
                const id = match.id.replace('match-', '');
                const t1 = document.getElementById(`name-${id}-t1`)?.innerText;
                const t2 = document.getElementById(`name-${id}-t2`)?.innerText;
                
                if (t1 && t2 && t1 !== '?' && t2 !== '?') {
                    document.getElementById(`score-${id}-t1`).disabled = false;
                    document.getElementById(`score-${id}-t2`).disabled = false;
                    const btn = match.querySelector('.btn-win');
                    if (btn) btn.disabled = false;
                }
            });
        }

        window.onload = initBracket;
