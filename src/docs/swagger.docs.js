/**
 * @swagger
 * /api/dashboard/{userId}:
 *   get:
 *     summary: Retrieve aggregated dashboard data for a user
 *     tags: [Dashboard]
 *     description: Fetches user profile from an external API and their posts, then aggregates them into a single response.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to fetch data for.
 *     responses:
 *       200:
 *         description: Successfully retrieved aggregated data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     company:
 *                       type: string
 *                     posts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           title:
 *                             type: string
 *                           body:
 *                             type: string
 *                     _partial:
 *                       type: boolean
 *       404:
 *         description: User not found.
 *       500:
 *         description: External API error.
 */
